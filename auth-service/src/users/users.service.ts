import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/users.enity';
import { UserRegisterDto } from './models/user-register.dto';
import { UserLogsInDto } from './models/user-login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly userRepo: Repository<Users>,
        private readonly jwtService: JwtService
    ){}


    async getAllUsers(){
        return await this.userRepo.find();
    }

    async registerUser(userData: UserRegisterDto){
        console.log("Received User Data: ",userData)
        const hashedPassword = await bcrypt.hash(
            userData.password,
            10,
          );
        
        try{
            const existingUser = await this.userRepo.findOne({
                where: {email: userData.email}
            })
            console.log("Existing User: "+ existingUser)
            if(existingUser)
                throw new HttpException("An email id with this already exixting in our database",409)
            const user = this.userRepo.create({
                first_name: userData.firstName,
                last_name: userData.lastName,
                password:hashedPassword,
                email: userData.email
            })
            await this.userRepo.save(user)
            const payload = {email: userData.email}
            const access_token= await this.jwtService.signAsync(payload)
            return {message: "You have` suceesfully Signed up, Please login using these credentials", access_token}
        }catch(err){
            if(err instanceof HttpException) return err;
            throw new Error("Registration failed"+err.message)
        }
        
    }




    async loginUser(loginData: UserLogsInDto){
        console.log("Data received for login: "+loginData)
        console.log(loginData.email)
        console.log(loginData.password)
        try{
            const user =await this.userRepo.findOne({
                where: {
                    email: loginData.email
                }
            })
            console.log("User"+user)
            if(!user){
                throw new HttpException('User Not Found',404)
            }
            const actualPassword = user.password;
            const isMatch = await bcrypt.compare(
                loginData.password,
                actualPassword
                
              );
            if(!isMatch){
                throw new HttpException('Wrong email or Password',401)
            }
            const payload= {email: user.email}
            const access_token = await this.jwtService.signAsync(payload)
            return {message: "You have successfuly loggedin",access_token}
        }catch(err){
            if(err instanceof HttpException) throw err;
            throw new Error('Something went wrong, Please try again: '+err.message)
        }
        
    }

    async getProfileData(email: string){
        console.log(email)
        try{
            const user = await this.userRepo.findOne({
                where: {
                    email:email
                }
            });
            if(!user){
                throw new HttpException('User not found!', 404)
            }
            return {
                name: user.first_name + " " +user.last_name,
                email: user.email,
                isPartner : user.isPartner
            };
        }catch(err){
            if(err instanceof HttpException)
                return err;
            throw new Error('Something went wrong '+err.message)
        }
    }

    

}

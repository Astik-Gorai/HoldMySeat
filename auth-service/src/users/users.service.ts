import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/users.enity';
import { UserRegisterDto } from './models/user-register.dto';
import { UserLogsInDto } from './models/user-login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly userRepo: Repository<Users>
    ){}


    async getAllUsers(){
        return await this.userRepo.find();
    }

    async registerUser(userData: UserRegisterDto){
        console.log("Received User Data: ",userData)
        const user = this.userRepo.create({
            first_name: userData.firstName,
            last_name: userData.lastName,
            password:userData.password,
            email: userData.email
        })
        try{
            await this.userRepo.save(user)
            return {message: "You have suceesfully Signed up, Please login using these credentials"}
        }catch(err){
            throw new Error("Registration failed"+err.message)
        }
        
    }


    async loginUser(loginData: UserLogsInDto):Promise<object> {
        try{
            const user =await this.userRepo.findOne({
                where: {
                    email: loginData.email
                }
            })
            if(!user){
                throw new HttpException('User Not Found',404)
            }
            const actualPassword = user.password;
            if(loginData.password!=actualPassword){
                throw new HttpException('Wrong email or Password',401)
            }
            return {message: "You have successfuly loggedin"}
        }catch(err){
            if(err instanceof HttpException) throw err;
            throw new Error('Something went wrong, Please try again: '+err.message)
        }
        
    }

    async getProfileData(email: string){
        try{
            const user = await this.userRepo.findOne({
                where: {
                    email
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

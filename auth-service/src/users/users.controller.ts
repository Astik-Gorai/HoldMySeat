import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from './models/user-register.dto';
import { UserLogsInDto } from './models/user-login.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){

    }
    @Get('test')
    test(){
        return "Hi Done!"
    }

    @Get('all-users')
    async getAllUsers(){
        return await this.userService.getAllUsers();
    }

    @Post('register')
    async registerUser(@Body() userData: UserRegisterDto){
        return await this.userService.registerUser(userData)
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async signInUser(@Body() loginData: UserLogsInDto){
        console.log(loginData)
        return await this.userService.loginUser(loginData)
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('profile')
    async getProfileData(@Query('email') email: string){
        return await this.userService.getProfileData(email);
    }

}

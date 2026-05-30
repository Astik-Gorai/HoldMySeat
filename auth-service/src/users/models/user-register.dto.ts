import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"



export class UserRegisterDto{
    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @ApiProperty()
    password: string

    @IsEmail()
    @ApiProperty()
    email: string
}
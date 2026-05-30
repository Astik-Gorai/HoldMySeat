import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"


export class UserLogsInDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({required: true})
    email: string

    @IsNotEmpty()
    @ApiProperty({required: true})
    password: string
}
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { FlowType } from "../../common/enums";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {

    @ApiProperty({ required: true, minLength: 3, maxLength: 255 })
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @ApiProperty({ required: false, minLength: 3, maxLength: 255 })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    description?: string;

    @ApiProperty({ required: true, enum: FlowType })
    @IsEnum(FlowType)
    type: FlowType;
}

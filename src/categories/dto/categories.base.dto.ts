import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CategoryBaseDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  @IsString()
  name: string;
}

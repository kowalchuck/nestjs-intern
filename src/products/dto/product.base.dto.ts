import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProductBaseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  name: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  categoryName?: string;
}

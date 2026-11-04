import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

export class CreateBikeDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  brand: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  model: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  category: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  frameMaterial: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  frameSizeCm: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  wheelSizeInches: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  gearCount: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  weightKg: number;

  @IsBoolean()
  electric: boolean;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  priceCents: number;
}

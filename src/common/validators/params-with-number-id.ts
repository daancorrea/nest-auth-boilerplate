import { IsNumberString } from 'class-validator';

class ParamsWithNumberId {
  @IsNumberString()
  id: number;
}

export default ParamsWithNumberId;

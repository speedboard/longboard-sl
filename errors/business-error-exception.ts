import {BusinessException} from './business-exception';

export class BusinessErrorException extends BusinessException {

    constructor(message: string, status: number) {
        super(message, status);
    }

}

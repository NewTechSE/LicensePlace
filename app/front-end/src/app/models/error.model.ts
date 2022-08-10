import { ErrorMsgConstant } from '../common/error-msg.constant';
import { ErrorEnum } from '../enums/error.enum';

export class ErrorModel {
  constructor(
    public code: ErrorEnum = null,
    public message: ErrorMsgConstant = null
  ) {
  }
}

export class PageNotFoundErrorModel extends ErrorModel {
  constructor() {
    super(ErrorEnum.NotFound, ErrorMsgConstant.NotFound);
  }

  public static init(): PageNotFoundErrorModel {
    return new PageNotFoundErrorModel();
  }
}

export class NotSupportedErrorModel extends ErrorModel {
  constructor() {
    super(ErrorEnum.NotSupported, ErrorMsgConstant.NotSupported);
  }

  public static init(): NotSupportedErrorModel {
    return new NotSupportedErrorModel();
  }
}

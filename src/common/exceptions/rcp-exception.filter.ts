import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();


    const rpcError = exception.getError();

    console.log('RPC Exception caught in filter:', rpcError);
    console.log('Full exception object:', exception);
    console.log(typeof rpcError, rpcError);
    if(typeof rpcError === 'object' && 'statusCode' in rpcError && 'message' in rpcError) {
      const status = isNaN(+rpcError.statusCode) ? 400 : (rpcError as any).statusCode;
      return response.status(status).json(rpcError);
    }


    return response.status(400).json({
      statusCode: 400,
      message: rpcError,
    });
  }
}
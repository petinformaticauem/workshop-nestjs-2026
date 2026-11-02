import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const inicio = Date.now();

    return next.handle().pipe(
      map((dadosDoController) => ({
        sucesso: true,
        tempoExecucao: `${Date.now() - inicio}ms`,
        dados: dadosDoController,
      })),
    );
  }
}

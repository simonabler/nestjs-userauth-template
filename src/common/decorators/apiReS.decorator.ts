import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ReS } from '../ReS.model';

export const ApiReS = <TModel extends Type<any>>(
  model: TModel,
  description: string,
  status?: number,
) => {
  if (status === 201) {
    return applyDecorators(
      ApiCreatedResponse({
        description,
        schema: {
          allOf: [
            { $ref: getSchemaPath(ReS) },
            {
              properties: {
                results: {
                  $ref: getSchemaPath(model),
                },
              },
            },
          ],
        },
      }),
    );
  }

  return applyDecorators(
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ReS) },
          {
            properties: {
              results: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};

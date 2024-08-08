import SwaggerParser from '@apidevtools/swagger-parser';

export async function parseOpenApi() {
  const parser = new SwaggerParser();
  await parser.dereference('./openapi.yaml');

  return parser.api;
}

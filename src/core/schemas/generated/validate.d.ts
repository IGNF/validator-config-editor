// Types des validateurs générés par scripts/compile-schemas.ts.
export interface SchemaError {
  instancePath: string
  keyword: string
  params: Record<string, unknown>
  message?: string
}

export interface SchemaValidator {
  (data: unknown): boolean
  errors?: SchemaError[] | null
}

export const validateDocument: SchemaValidator
export const validateTable: SchemaValidator
export const validateGpu: SchemaValidator

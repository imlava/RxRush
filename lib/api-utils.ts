export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function handleApiRoute(handler: () => Promise<any>) {
  try {
    const result = await handler()
    return Response.json(result)
  } catch (error) {
    console.error('API Error:', error)

    if (error instanceof ApiError) {
      return Response.json(
        {
          error: error.message,
          data: error.data,
        },
        { status: error.statusCode }
      )
    }

    return Response.json(
      {
        error: 'Internal Server Error',
      },
      { status: 500 }
    )
  }
}

export function createSuccessResponse(data: any, status = 200) {
  return Response.json(data, { status })
}

export function createErrorResponse(message: string, status = 400, data?: any) {
  return Response.json(
    {
      error: message,
      data,
    },
    { status }
  )
}

export async function validateRequestBody(
  request: Request,
  schema: any
): Promise<any> {
  try {
    const body = await request.json()
    // You can add your validation logic here
    // For example, using Zod or Joi
    return body
  } catch (error) {
    throw new ApiError(400, 'Invalid request body')
  }
} 
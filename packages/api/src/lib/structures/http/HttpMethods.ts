/**
 * @since 1.0.0
 */
export const enum Methods {
	/**
	 * The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
	 * @since 1.0.0
	 */
	GET = 'GET',

	/**
	 * The HEAD method asks for a response identical to that of a GET request, but without the response body.
	 * @since 1.0.0
	 */
	HEAD = 'HEAD',

	/**
	 * The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
	 * @since 1.0.0
	 */
	POST = 'POST',

	/**
	 * The PUT method replaces all current representations of the target resource with the request payload.
	 * @since 1.0.0
	 */
	PUT = 'PUT',

	/**
	 * The DELETE method deletes the specified resource.
	 * @since 1.0.0
	 */
	DELETE = 'DELETE',

	/**
	 * The CONNECT method establishes a tunnel to the server identified by the target resource.
	 * @since 1.0.0
	 */
	CONNECT = 'CONNECT',

	/**
	 * The OPTIONS method is used to describe the communication options for the target resource.
	 * @since 1.0.0
	 */
	OPTIONS = 'OPTIONS',

	/**
	 * The TRACE method performs a message loop-back test along the path to the target resource.
	 * @since 1.0.0
	 */
	TRACE = 'TRACE',

	/**
	 * The PATCH method is used to apply partial modifications to a resource.
	 * @since 1.0.0
	 */
	PATCH = 'PATCH'
}

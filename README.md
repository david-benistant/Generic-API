# Generic API for File Upload and Data Storage

This API is designed to be as generic as possible. You can upload any file using S3 presigned URLs and store any data using DynamoDB. The API provides basic security by allowing only authenticated users to perform write actions (POST, UPDATE, DELETE).

## Installation

### 1. Create an AWS User
First, you need to create a new AWS user and assign the following permissions:

- `AmazonAPIGatewayAdministrator`
- `AmazonDynamoDBFullAccess`
- `AmazonS3FullAccess`
- `AWSCloudFormationFullAccess`
- `AWSCloudFormationReadOnlyAccess`
- `AWSLambda_FullAccess`
- `CloudWatchLogsFullAccess`
- `IAMFullAccess`

Once the user is created, generate a new access key for this user.

### 2. Set Up Environment Variables

- Create a `.env` file at the root of the repository and fill it with the same information found in `.env.example`. Make sure to include the access key and secret key for the AWS user you just created.

### 3. Set Up Additional Config Files

- Create a file named `runtime-env.json` in the `./app` directory. You can use the `runtime-env.json.example` as a reference for how to structure this file.
- Fill the `properties.json` file with appropriate values. This will vary depending on your specific use case.

## Deploy

- To deploy the API, simply run `docker compose up`, and the entire API should be deployed on AWS. Be mindful of potential errors.

### Known Errors:
- Some characters are forbidden in DynamoDB table keys (e.g., `/`, `\\`, `.`, `#`, `~`, `{}`, `<>`).
- Your S3 bucket name must be globally unique, so feel free to add randomness to your bucket name.
- Some characters are forbidden in S3 buckets names. (ex: uppercase characters)

## Documentation

- A Postman collection is available at the root of the repository: [postman_collection.json](./postman_collection.json)
- An OpenAPI (Swagger) file is also available at the root of the repository: [openAPI.yml](./openAPI.yml)

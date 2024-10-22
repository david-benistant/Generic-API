export default {
    DocumentsBucket: {
      Type: 'AWS::S3::Bucket',
      Properties: {
          BucketName: '${self:provider.environment.BUCKET_NAME}-${self:provider.stage}',
          CorsConfiguration: {
          CorsRules: [
            {
              AllowedHeaders: ['*'],
              AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
              AllowedOrigins: ['*'],
              MaxAge: 3000,
            },
          ],
        },
      },
    },
  };
  
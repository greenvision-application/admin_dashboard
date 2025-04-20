import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerPage: React.FC = () => {
  return (
    <div style={{ height: '100vh' }}>
      <SwaggerUI
        url="https://green-vision-dev.onrender.com/api-json"
        docExpansion="none"
        defaultModelsExpandDepth={-1}
      />
    </div>
  );
};

export default SwaggerPage;

const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    // Parse incoming data
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.name || !data.literacyLevel) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Connect to MongoDB
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await client.connect();
    
    // Insert document
    const database = client.db('careerPaths');
    const collection = database.collection('submissions');
    const result = await collection.insertOne({
      ...data,
      submittedAt: new Date()
    });

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: 'Submission successful',
        id: result.insertedId
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message
      })
    };
  } finally {
    // Ensure connection is closed
    if (client) await client.close();
  }
};
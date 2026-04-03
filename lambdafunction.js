const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        // DynamoDB v3 requires attribute types
        const item = {
            KasvihuoneID: { S: body.KasvihuoneID },
            AikaLeima: { S: body.AikaLeima },
            LaiteID: { S: body.LaiteID },
            LaiteTyyppi: { S: body.LaiteTyyppi },
            Mittausarvo: { N: body.Mittausarvo.toString() },
        };

        await client.send(
            new PutItemCommand({
                TableName: process.env.TABLE_NAME,
                Item: item,
            }),
        );

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
            },
            body: JSON.stringify({
                message: 'Item written successfully',
                item: item,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'Error writing item',
                error: error.message,
            }),
        };
    }
};

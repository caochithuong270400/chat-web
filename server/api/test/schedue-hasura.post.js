import { GraphQLClient, gql } from 'graphql-request';


export default defineEventHandler(async (event) => {
    console.log('vào hàm gọi hasura');

    let body = await readBody(event);
    let result = null


    // Tạo một promise để thực hiện truy vấn
    const queryPromise = () => {
        // URL của Hasura GraphQL API
        const endpoint = 'https://s-deal-app.hasura.app/v1/graphql';

        // Tạo GraphQL Client với endpoint và các headers (nếu có)
        const client = new GraphQLClient(endpoint, {
            headers: {
                'x-hasura-admin-secret': 'Dx7ZGDCbTd3URW4Csh42UrkZTllgjLtmbBQ3TR5Gh8Ze34qXKFWYKjcCdwO2Nemr', // Thay bằng Admin Secret của Hasura
            },
        });

        // Định nghĩa truy vấn GraphQL
        const query = gql`
            query MyQuery {
            his_ace_companies(limit: 10) {
                address
                code
                id
                created_by
                created_at
            }
            }
            `;

        // Thực hiện truy vấn
        console.log('bắt đầu truy vấn');

        return new Promise((resolve, reject) => {
            client.request(query)
                .then((data) => {
                    console.log(data)
                    console.error('có data', data)
                    resolve(data);
                })
                .catch((err) => {
                    console.error('lỗi trong api', err)
                    reject(err);
                });
        });
    };


    const resultsBills = await queryPromise();

    console.log('results', resultsBills);

    // Xử lý dữ liệu ở đây
    return { resultsBills };
})
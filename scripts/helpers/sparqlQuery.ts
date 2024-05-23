import isPortReachable from "is-port-reachable";
import SparqlClient from "sparql-http-client";
import z, { ZodType } from "zod";

export const sparqlQuery = <ResultType>(
  query: string,
  resultSchema: ZodType<ResultType, any, any>,
): Promise<ResultType[]> => {
  const endpointUrl: string = "http://localhost:3030/art";
  return new Promise((resolve, reject) => {
    console.log(
      `Checking if apache jena fuseki server is reachable at ${endpointUrl}`,
    );
    isPortReachable(3030, { host: "localhost" })
      .catch((error) => {
        reject(
          "It looks like you have not started the fuseki server. Make sure it is running and reachable at http://localhost:3030. You also need to have the dataset loaded as 'art'.",
        );
      })
      .then(() => {
        console.log(`Executing sparql query`);

        const client = new SparqlClient({ endpointUrl });
        const stream = client.query.select(query);

        const results: Array<ResultType> = [];

        stream.on("data", (result: unknown) => {
          try {
            // Simplify the result object to only contain the values
            // Maybe you need to adjust this or create a new sparqlquery function for your use case
            const simplifiedResult = Object.fromEntries(
              Object.entries(z.record(z.string(), z.any()).parse(result)).map(
                ([key, value]) => [key, value.value],
              ),
            );

            const validatedResult = resultSchema.parse(simplifiedResult);

            results.push(validatedResult);
          } catch (error) {
            reject(error);
          }
        });

        stream.on("error", (err) => {
          reject(err);
        });

        stream.on("end", () => {
          resolve(results);
        });
      });
  });
};

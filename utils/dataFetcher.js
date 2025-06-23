// export async function dataFetcher(api) {
//   try {
//     const response = await fetch(api);
//     if (response.status !== 200) {
//       throw new Error("Failed to fetch data");
//     }
//     const result = await response.json();

//     return result; // Adjust this based on the API structure
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return []; // Fallback to an empty array if there's an error
//   }
// }

export async function dataFetcher(api, options = {}) {
  try {
    const response = await fetch(api, options); // ✅ forward options
    if (response.status !== 200) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function contentFetcher(api, options = {}) {
  try {
    const response = await fetch(api, options); // ✅ forward options
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();

    return result; // Adjust this based on the API structure
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Fallback to an empty array if there's an error
  }
}

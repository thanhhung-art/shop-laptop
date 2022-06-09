
export async function callCheckAuth () {
  return fetch("/api/auth/check/user")
    .then(res => res.json())
}

export async function getInfiniteProducts({
  pageParam = 0,
}): Promise<{ next: number; products: Product[] }> {
  const res = await fetch(`/api/products?page=${pageParam}`);
  const data = await res.json();
  return data;
}
 
export function getNewProducts() {
  const header = new Headers({"Access-Control-Allow-Origin": "*"});
  return fetch(process.env.NEXT_PUBLIC_URL + "/api/products/?new=true", {headers: header})
    .then((res) => res.json())
    .then((data) => data);
}

export function getFeaturedProduct() {
  return fetch(process.env.NEXT_PUBLIC_URL + "/api/products/?featured=true")
    .then((res) => res.json())
    .then((data) => data);
}

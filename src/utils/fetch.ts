
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
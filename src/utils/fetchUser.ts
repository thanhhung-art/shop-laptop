
type Body = {
  email: string;
  password: string;
}

export const fetchUser = async (url: string, method: string, body: Body) =>{
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}
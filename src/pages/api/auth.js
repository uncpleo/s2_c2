export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const user = users.find(user => user.username === username && user.username === password);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

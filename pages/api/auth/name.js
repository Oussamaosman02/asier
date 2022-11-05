import cookie from 'cookie'

export default function Name (req, res) {
  const { name, pass } = req.body
  const contra = process.env.PASSWORD
  if (pass === contra) {
    const nombre = cookie.serialize('nombre', name, {
      httpOnly: false,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30 * 12,
      path: '/'
    })
    res.setHeader('Set-Cookie', nombre)
    return res.json('login succesfull')
  } else {
    return res.status(401).json({ data: 'Error while validating, try other password' })
  }
}

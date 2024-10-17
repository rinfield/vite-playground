import { useState } from 'react'
import './App.css'

function Input(props: {
  id: string,
  label: string,
  value: string | undefined,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}) {
  return <div>
    <label>{props.label}: </label>
    <input type="text" id={props.id} name={props.id} value={props.value} onChange={props.onChange} />
  </div>;
}

function Link(props: { customScheme: string, userId?: string, issuer?: string, secret?: string }) {
  if (props.userId === undefined
    || props.userId === ""
    || props.secret === undefined
    || props.secret === "") {
    return <div>必須事項が足りません</div>
  }
  let otpRegistrationUrl = `${props.customScheme}://totp/${props.userId}?secret=${props.secret}`
  if (props.issuer) {
    const urlEncodedIssuer = encodeURI(props.issuer);
    otpRegistrationUrl = `${otpRegistrationUrl}&issuer=${urlEncodedIssuer}`
  }
  return <div><a href={otpRegistrationUrl}>OTP登録</a></div>

}

function App() {
  const [customScheme, setCustomScheme] = useState("otpauth")
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [issuer, setIssuer] = useState<string | undefined>(undefined)
  const [secret, setSecret] = useState<string | undefined>(undefined)

  return (
    <>
      <Input id="custom-scheme" label="Custom Scheme" value={customScheme} onChange={e => setCustomScheme(e.target.value)} />
      <Input id="userid" label="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <Input id="secret" label="Secret" value={secret} onChange={e => setSecret(e.target.value)} />
      <Input id="issuer" label="Issuer (Optional)" value={issuer} onChange={e => setIssuer(e.target.value)} />

      <Link customScheme={customScheme} userId={userId} issuer={issuer} secret={secret} />
    </>
  )
}

export default App

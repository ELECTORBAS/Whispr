
const verifyOTP = () => {
  return (
    <section id='verifyOTP'>
        <div className="container md:w-1/3 w-[80%]">
          <form>
          <h1>Verify OTP</h1>
          <p className="light-text">Enter the OTP sent to your email</p>
          <div className="input-container">
            <input type="text" sugestions={0}/>
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button type="submit">Verify</button>
          </div>
          </form>
        </div>
    </section>
  )
}

export default verifyOTP
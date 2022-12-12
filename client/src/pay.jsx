import StripeCheckout from "react-stripe-checkout";
import { usestate, useEffect} from "react";
import axios from "axios";

const KEY =
"pk_test_51ME3smSGmahIV39P4nnR5VmOlws3wKtSiagXfoZesjCn3oDPgsOavfCekSDCw5Dhn8Oy1xWjS4tmgMQvTtxKNG3B00EHXBQkgq"

const Pay = () =>
{

    const [stripeToken, setStripeToken] = useState(null);
    const history  = useHistory()

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/checkout/payment",{
                    tokenId: stripeToken.id,
                    amount: 2000
                }
            );
            console.log(res.data);
            history.push("/success");
        }catch (err) {
            console.log(err);

        }
        };
        stripeToken && makeRequest
    },[stripeToken,history]);
}


    return(
        <div
          style ={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          >

          {stripeToken ? (<span>Processing. Please wait...</span>):(
          <StripeCheckout
          name ="Shunk Shop"
          image ="http://avatars.githubusercontent.com/u/1486366?v=4"
          billingAddress
          shippingAddress
          description =" Your total is $20"
          amount = {2000}
          token ={onToken}
          stripeKey={KEY}
>
          <button
            
             style= {{
                border:"none";
                width:120,
                borderRadius: 5,
                padding: "20px",
                backgroundColor: "black",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
             }}
>
             Pay Now
             </button>
             </StripeCheckout>
          )}
             </div>
    );
};  
    
export default Pay;
import  { MercadoPagoConfig, Preference } from "mercadopago"


export const createCheckOutPreference = async (req, res) => {
    const { body } = req;

    try {

         const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP });
        const preference = new Preference(client)

        const response = await preference.create({
            body: {
                ...body,
                back_urls: {
                    success: `${process.env.URL_FRONTEND}/checkout/success`
                    //failure: `${process.env.URL_FRONTEND}/checkout/failure`,
                },
            }
        })

        res.json({
            ok: true,
            preferenceId: response.id
        })
        
    } catch (error) {
        console.log("Error internal server", error);
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        }
        );
    }
   

}
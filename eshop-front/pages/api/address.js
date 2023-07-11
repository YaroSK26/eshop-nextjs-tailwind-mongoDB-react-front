import { getServerSession } from "next-auth"
import {mongooseConnect} from "../../lib/mongoose"
import { Address } from "../../models/Address"
import { authOptions} from "../../pages/api/auth/[...nextauth]"

export default async function handle(req, res) {
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;

  if (req.method === "PUT") {
    if (!user) {
   
    }

    const address = await Address.findOne({ userEmail: user?.email });
    if (address) {
      res.json(await Address.findByIdAndUpdate(address._id, req.body));
    } else {
      res.json(await Address.create({ userEmail: user?.email, ...req.body }));
    }
  }

  if (req.method === "GET") {
    if (!user) {
   
    }

    const address = await Address.findOne({ userEmail: user?.email });
    if (address) {
      res.json(address);
    } else {
      res.json({}); // Vráti prázdny objekt, ak užívateľ nemá žiadne údaje
    }
  }
}

import {
    User,
    MapPin,
    IndianRupee,
    CircleDollarSign,
    CheckCircle
} from "lucide-react";


function ResultCard({ account }) {

    return (

        <div className="result-card">

            {/* Name 1 */}
            <div className="result-row">

                <div className="result-label">
                    <User size={18} />
                    <span>பெயர்</span>
                </div>

                <strong>
                    {account.Name1_TA ||
                        account.Name1 ||
                        "-"}
                </strong>

            </div>


            {/* Name 2 */}
            <div className="result-row">

                <div className="result-label">
                    <User size={18} />
                    <span>பெயர் 2</span>
                </div>

                <strong>
                    {account.Name2_TA ||
                        account.Name2 ||
                        "-"}
                </strong>

            </div>


            {/* Village */}
            <div className="result-row">

                <div className="result-label">
                    <MapPin size={18} />
                    <span>ஊர்</span>
                </div>

                <strong>
                    {account.Village_TA ||
                        account.Village ||
                        "-"}
                </strong>

            </div>


            {/* Amount */}
            <div className="result-row">

                <div className="result-label">
                    <IndianRupee size={18} />
                    <span>தொகை</span>
                </div>

                <strong>
                    ₹ {account.Ammount ?? 0}
                </strong>

            </div>


            {/* Extra Amount */}
            <div className="result-row">

                <div className="result-label">
                    <CircleDollarSign size={18} />
                    <span>கூடுதல் தொகை</span>
                </div>

                <strong>
                    ₹ {account.Extra_Ammount ?? 0}
                </strong>

            </div>


            {/* Status */}
            <div className="result-row">

                <div className="result-label">
                    <CheckCircle size={18} />
                    <span>நிலை</span>
                </div>

                <strong>
                    {account.Tick || "-"}
                </strong>

            </div>


            {/* Fuzzy similarity */}
            {account.similarity && (

                <div className="similarity">

                    பொருத்தம்: {account.similarity}%

                </div>

            )}

        </div>

    );
}


export default ResultCard;
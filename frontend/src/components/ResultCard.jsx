import {
    User,
    MapPin,
    IndianRupee,
    CircleDollarSign,
    CheckCircle
} from "lucide-react";

function ResultCard({ account, onTickChange }) {

    return (
        <div className="result-card">

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


            <div className="result-row">
                <div className="result-label">
                    <IndianRupee size={18} />
                    <span>தொகை</span>
                </div>

                <strong>
                    ₹ {account.Ammount ?? 0}
                </strong>
            </div>


            <div className="result-row">
                <div className="result-label">
                    <CircleDollarSign size={18} />
                    <span>கூடுதல் தொகை</span>
                </div>

                <strong>
                    ₹ {account.Extra_Ammount ?? 0}
                </strong>
            </div>


            {/* Tick */}
            <div className="result-row">
                <div className="result-label">
                    <CheckCircle size={18} />
                    <span>நிலை</span>
                </div>

                <div className="tick-section">

                    <strong>
                        {account.Tick || "-"}
                    </strong>

                    <div className="tick-buttons">

                        <button
                            type="button"
                            onClick={() =>
                                onTickChange(account, "Yes")
                            }
                        >
                            Yes
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                onTickChange(account, "No")
                            }
                        >
                            No
                        </button>

                    </div>

                </div>
            </div>


            {account.similarity && (
                <div className="similarity">
                    பொருத்தம்: {account.similarity}%
                </div>
            )}

        </div>
    );
}

export default ResultCard;
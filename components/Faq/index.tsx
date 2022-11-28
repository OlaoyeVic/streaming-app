import { useState } from "react"
import { faqs } from "../../data/faqs"

interface IProps {
    question: string
    answer: string
}

const Faq = ({question, answer}: IProps) => {
    const [isActive, setIsActive] = useState(false)
    
    return (
        <>
            <div className="mb-faq">
                <div className="faq-title" onClick={() => setIsActive(!isActive)}>
                                <div>{question}</div>
                                <div>{isActive ? '-' : '+'}</div>
                </div>
                {isActive && <div className="faq-content">{answer}</div>}
            </div>
            <div className="dt-faq">
                <div className="faq-title" onClick={() => setIsActive(!isActive)}>
                                <div>{question}</div>
                                <div>{isActive ? '-' : '+'}</div>
                </div>
                {isActive && <div className="faq-content">{answer}</div>}
            </div>
        </>
    )
}
export default Faq
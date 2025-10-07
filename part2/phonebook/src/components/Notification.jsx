const Notification = ({ messageObj }) => {
    if (messageObj === null) {
        return null
    }

    return (
        <div className={`message ${messageObj.messageType}`}>
            {messageObj.message}
        </div>
    )
}

export default Notification
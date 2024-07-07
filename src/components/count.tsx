type CountProps = {
    count: number
}

const Count = (props: CountProps) => {
    return <div>
        {props.count}
    </div>
}

export default Count;
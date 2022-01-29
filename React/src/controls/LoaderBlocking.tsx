interface Props {
    message: string;
}

const LoaderBlocking = ({ message }: Props) => (
    <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
            <section className="modal-card-body">
                {message}
            </section>
        </div>
    </div>
);

export default LoaderBlocking;

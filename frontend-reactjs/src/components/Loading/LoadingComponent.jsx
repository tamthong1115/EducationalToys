import { tailChase } from 'ldrs'
tailChase.register()

export default function LoadingComponent() {
    const renderLoadingState = () => {
        return (
            <div className="flex h-screen">
                <l-tail-chase
                    size="100"
                    speed="1.75"
                    color="black"
                ></l-tail-chase>{' '}
            </div>
        )
    }

    return (
        <div
            className="flex min-h-screen items-center justify-center"
            aria-live="polite"
        >
            {renderLoadingState()}
        </div>
    )
}

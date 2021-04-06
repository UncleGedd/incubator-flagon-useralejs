export function workerSendLog(e) {
    // const {url, logs} = e.data
    const {url} = e.data
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(logs && logs.length > 0 ? logs : [])
        body: JSON.stringify([{webworker: 'from web worker'}])

    })
}

export function createWorker(fn) {
    const blob = new Blob(['self.onmessage = ', fn.toString()], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    return new Worker(url);
}
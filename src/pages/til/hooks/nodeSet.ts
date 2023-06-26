const useNodeSet = (node: DocumentFragment | HTMLElement | null) => {
    let cnt = 0;
    if (node && node.childNodes) {
        for (const value of Object.entries(node.childNodes)) {
            if (value[1].textContent === '') {
                cnt += 1;
                node.removeChild(value[1])
            }
            else {
                if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                    value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                }
            }
        }
    }
}

export default useNodeSet;
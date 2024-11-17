export const downloadfileFromUrl = (fileUrl: string) => {
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileUrl.split('/').pop() ?? '';
            a.click();
            window.URL.revokeObjectURL(url);
        });
};

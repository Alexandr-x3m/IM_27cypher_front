

export const getCookie = (name: string) => {
    const r = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (r) {
        return r[2];
    }
    return '';
}

export const setCookie = (name: string, value: string) => {
    document.cookie = name + '=' + value
}

export function deleteCookie() {
    const date = new Date(); // Берём текущую дату
    date.setTime(date.getTime() - 1); // Возвращаемся в "прошлое"
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name += '=; expires=' + date.toUTCString(); // Устанавливаем cookie пустое значение и срок действия до прошедшего уже времени
    }
}

export function deleteOneCookie(name: string) {
    const date = new Date(); // Берём текущую дату
    date.setTime(date.getTime() - 1); // Возвращаемся в "прошлое"
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf(name);
        if (eqPos !== -1) {
            const eq = cookie.indexOf('=');
            let name = eq > -1 ? cookie.substr(0, eq) : cookie;
            document.cookie = name += '=; expires=' + date.toUTCString();
        }
    }
}
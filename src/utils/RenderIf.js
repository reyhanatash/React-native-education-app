export default function renderIf(condition, content,falseConView) {
    if (condition) {
        return content;
    } else {
        return falseConView;
    }
}



let getHtmlInput = function (type, plh) {
    let html = '<div id="toChange"><div style="width: 60%"><input required type="text" id="ser" name="new" placeholder="'+plh+ '"></input></div><br>'+'<button type="submit">Изменить ученика</button></div>';
    return (html);
}
let getHtmlSelect = function (type) {
    if (type != "sex") {
        let html = '<div id="toChange"><select name="new">';
        for (let i = 1920; i < 2023; i++) {
            html = html + '<option value="' + i + '">' + i + '</option>';
        }
        html = html + '</select><br> <button type = "submit" > Изменить ученика</button> </div>';
        return (html);
    }
    else {
        let html = '<div id="toChange"><select name="new"><option value="Мужской">Мужской</option><option value="Женский">Женский</option><option value="Другой">Другой</option></select> </select> <br> <button type = "submit" > Изменить ученика</button> </div>'; 
        return (html);
    }
}
$(document).ready(function () {
    
    $("#check").click(() => {
        const field = $("#field").val();
        console.log(field);
        $("div").remove("#toChange");
        switch (field) {
            case 'name':
                $('#changeF').append(getHtmlInput(field, "Ибрагим"));
                break;
            case 'surname':
                $('#changeF').append(getHtmlInput(field, "Ленин"));
                break;
            case 'address':
                $('#changeF').append(getHtmlInput(field, "Беларусь, Жлобин, мкр.1, д.3, кв.34"));
                break;
            case 'ageOfBirth':
                $('#changeF').append(getHtmlSelect(field));
                break;
            case 'sex':
                $('#changeF').append(getHtmlSelect(field));
                break;
            default:
                console.log("err");
                break;
        }
    })
});
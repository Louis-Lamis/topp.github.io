
/*switchable sidebar=================*/


$(document).ready(function(){
    $('.contains').hide();
    $('.contains:first').show();
    $('.sidebar li:first').addClass('active');


    $('.sidebar li').click(function(event){
        index =$(this).index();
        $('.sidebar li').removeClass('active');
        $(this).addClass('active');

        $('.contains').hide();
        $(this).addClass('active');
        $('.contains').eq(index).show();
    });



});


/*=============Loading page =====*/

window.onload =function(){
    document.getElementById('loader').style.display='none';
    document.getElementById('loader_content').style.display='block';

}

/*==============Deletion validation============*/
function deleteFucnction(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Record has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
}





/*froms js =========*/


function mascara(i) {
    const v = i.value;

    if (isNaN(v[v.length - 1])) {
        // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
}

function formataCPF(i) {
    let cpf = i.value;
    cpf = cpf.replace(/[^\d]/g, "");

    i.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// @todo(myself) Give credits to the guy who made this, and make accessibility adjustments
class DataList {
    constructor(
        options,
        {
            containerId = "datalist",
            inputId = "datalist-input",
            listId = "datalist-ul"
        } = {}
    ) {
        this.containerId = containerId;
        this.inputId = inputId;
        this.listId = listId;
        this.options = options;
    }

    create(filter = "") {
        const list = document.getElementById(this.listId);
        const filterOptions = this.options.filter(
            (d) =>
                filter === "" ||
                d.text.toLowerCase().includes(filter.toLowerCase())
        );
        if (filterOptions.length === 0) {
            list.classList.remove("active");
            filterOptions.push({
                value: "",
                text: "No value found with theses parameters."
            });
        } else {
            list.classList.add("active");
        }

        list.innerHTML = filterOptions
            .map((o) => `<li data-value=${o.value}><span>${o.text}</span></li>`)
            .join("");
    }

    addListeners(datalist) {
        const container = document.getElementById(this.containerId);
        const input = document.getElementById(this.inputId);
        const list = document.getElementById(this.listId);
        document.addEventListener("click", (e) => {
            if (!e.target.closest(`#${this.containerId}`)) {
                container.classList.remove("active");
            }
        });

        container.addEventListener("click", (e) => {
            if (e.target.id === this.inputId) {
                container.classList.add("active");
            } else if (e.target.classList.contains("datalist-icon")) {
                container.classList.toggle("active");
                input.focus();
            }

            if (container.classList.contains("active")) {
                const rect = list.getBoundingClientRect();
                if (
                    !(
                        rect.top >= 0 &&
                        rect.bottom <=
                            (window.innerHeight ||
                                document.documentElement.clientHeight)
                    )
                ) {
                    list.classList.add("datalist-ul--up");
                }
            }
        });

        input.addEventListener("focus", (e) => {
            container.classList.add("active");
        });

        input.addEventListener("input", (e) => {
            if (!container.classList.contains("active")) {
                container.classList.add("active");
            }

            datalist.create(input.value);
        });

        list.addEventListener("click", (e) => {
            if (e.target.nodeName.toLocaleLowerCase() === "li") {
                if (!e.target.dataset.value) return;
                input.value = e.target.innerText;
                container.classList.remove("active");
                datalist.create();
                input.setCustomValidity("");
            }
        });
    }
}

const data = [
    {
        value: "1",
        text: "HR"
    },
    {
        value: "2",
        text: "FACTORY"
    },
    {
        value: "3",
        text: "GENERAL MANAGER"
    },
    {
        value: "4",
        text: "RSPO"
    }
];



const datalist = new DataList(data);

datalist.create();
datalist.addListeners(datalist);

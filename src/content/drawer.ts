import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import FaceIcon from '@mui/icons-material/Face';
import LogoutIcon from '@mui/icons-material/Logout';

export const linksAdmin = [
    {
        name: "Início",
        link: "/admin/home",
        icon: HomeOutlinedIcon
    },
    {
        name: "Cursos",
        link: "/admin/courses",
        icon: BookOutlinedIcon
    },
    {
        name: "Disciplinas",
        link: "/admin/subject",
        icon: ArticleOutlinedIcon
    },
    {
        name: "Professores",
        link: "/admin/teachers",
        icon: PeopleOutlinedIcon
    },
    {
        name: "Avisos",
        link: "/admin/warnings",
        icon: LibraryAddCheckOutlinedIcon
    },
    {
        name: "Alunos",
        link: "/admin/student",
        icon: FaceIcon
    },
    {
        name: "Perfil",
        link: "/profile",
        icon: PermIdentityOutlinedIcon
    },
    {
        name: "Logout",
        link: "/",
        icon: LogoutIcon
    },
]
export const linksTeacher = [
    {
        name: "Início",
        link: "/teacher/home",
        icon: HomeOutlinedIcon
    },
    {
        name: "Disciplinas",
        link: "/teacher/subject",
        icon: ArticleOutlinedIcon
    },
    {
        name: "Cronograma",
        link: "/teacher/teachers",
        icon: PeopleOutlinedIcon
    },
    {
        name: "Documento",
        link: "/teacher/docs",
        icon: LibraryAddCheckOutlinedIcon
    },
    {
        name: "Perfil",
        link: "/teacher/profile",
        icon: PermIdentityOutlinedIcon
    },
    {
        name: "Logout",
        link: "/",
        icon: LogoutIcon
    },
]
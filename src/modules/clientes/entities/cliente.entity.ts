import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "clientes" })
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", length: 255, nullable: false })
    nome: string;

    @Column({ name: "email", length: 255, nullable: false, unique: true })
    email: string;

    @Column({ name: "data_nascimento", type: "date", nullable: false })
    dataNascimento: Date;

    @Column({ name: "telefone", length: 20, nullable: true })
    telefone?: string;

    @Column({ name: "cpf", length: 11, nullable: false, unique: true })
    cpf: string;

    constructor(cliente?: Partial<Cliente>){
        this.id = cliente?.id;
        this.nome = cliente?.nome;
        this.email= cliente?.email;
        this.dataNascimento = cliente?.dataNascimento;
        this.telefone = cliente?.telefone;
        this.cpf = cliente?.cpf;

    }
}

import {Component, Inject} from "@nestjs/common";
import {Model} from "sequelize-typescript";
import {Link} from "./link.entity";
import {LinksRepository} from "./link.provider";
import {CreateLinkDto} from "./dto/create-link.dto";

@Component()
export class LinkService {
  constructor(@Inject(LinksRepository) private readonly linksRepository: typeof Model) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    const link = new Link()
    const {url} = createLinkDto

    link.url = url

    return await link.save()
  }

  async findById(id: number | string): Promise<Link> {
    return await this.linksRepository.findById<Link>()
  }

  async findByUrl(url: string): Promise<Link> {
    return await this.linksRepository.findOne<Link>({where: {url}})
  }
}
